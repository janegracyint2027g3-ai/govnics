import { redis, KEYS } from '../api/lib/redis.js';

async function syncAllUsers() {
  console.log('--- Connecting to Upstash Redis to sync all registered user data ---');

  // Find all user keys
  const userKeys = await redis.keys('govenics:user:*');
  console.log(`Found ${userKeys.length} user keys in Redis:`, userKeys);

  const pipeline = redis.pipeline();
  let count = 0;

  for (const userKey of userKeys) {
    const userId = userKey.replace('govenics:user:', '');
    const userRaw = await redis.get(userKey);
    if (!userRaw) continue;

    const user = typeof userRaw === 'string' ? JSON.parse(userRaw) : userRaw;
    const companyId = user.companyId || await redis.get(KEYS.userCompany(userId));

    let company = null;
    if (companyId) {
      const companyRaw = await redis.get(KEYS.company(companyId));
      if (companyRaw) {
        company = typeof companyRaw === 'string' ? JSON.parse(companyRaw) : companyRaw;
      }
    }

    let registrationMeta = null;
    const regRaw = await redis.get(KEYS.registration(userId));
    if (regRaw) {
      registrationMeta = typeof regRaw === 'string' ? JSON.parse(regRaw) : regRaw;
    }

    // 1. Ensure master set includes this user
    pipeline.sadd(KEYS.allUsers(), userId);

    // 2. Ensure combined complete profile exists
    const completeUserData = {
      ...user,
      passwordHash: undefined,
      company: company || null,
      registrationMeta: registrationMeta || {
        userId,
        companyId,
        registeredAt: user.createdAt,
        registrationSource: 'web'
      }
    };
    pipeline.set(KEYS.userData(userId), JSON.stringify(completeUserData));

    console.log(`Prepared sync for User ID: ${userId} (${user.email} / @${user.preferredUserId})`);
    count++;
  }

  // Clear existing list and rebuild fresh
  await redis.del(KEYS.allRegistrations());

  for (const userKey of userKeys) {
    const userId = userKey.replace('govenics:user:', '');
    const userRaw = await redis.get(userKey);
    const user = typeof userRaw === 'string' ? JSON.parse(userRaw) : userRaw;
    const companyId = user.companyId || await redis.get(KEYS.userCompany(userId));
    let company = null;
    if (companyId) {
      const companyRaw = await redis.get(KEYS.company(companyId));
      if (companyRaw) {
        company = typeof companyRaw === 'string' ? JSON.parse(companyRaw) : companyRaw;
      }
    }

    pipeline.rpush(KEYS.allRegistrations(), JSON.stringify({
      userId,
      email: user.email,
      preferredUserId: user.preferredUserId,
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      companyName: company?.companyName || '—',
      industrySector: company?.industrySector || '—',
      country: company?.country || '—',
      registeredAt: user.createdAt,
    }));
  }

  await pipeline.exec();
  console.log(`Successfully synced ${count} registered users to Redis master set and lists.`);

  // Verify
  const allUserIds = await redis.smembers(KEYS.allUsers());
  const allRegs = await redis.lrange(KEYS.allRegistrations(), 0, -1);
  console.log('\n=== VERIFICATION ===');
  console.log('Total registered user IDs in govenics:users:', allUserIds.length);
  console.log('Total entries in govenics:registrations:list:', allRegs.length);
  allRegs.forEach((r, i) => {
    console.log(`User ${i + 1}:`, r);
  });
}

syncAllUsers().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
