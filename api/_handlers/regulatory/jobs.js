// api/_handlers/regulatory/jobs.js
// Handler for Extraction Job Manager & Agent Task Automation

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { ExtractionJobManager } from "../../_lib/regulatory/extractionJobManager.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers?.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:jobs:${clientIp}`, 60, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 60 requests per minute.");
    }

    const url = new URL(req.url, `https://${req.headers?.host || "localhost"}`);
    const jobId = url.searchParams.get("jobId");

    // GET /api/regulatory/jobs or /api/regulatory/jobs?jobId=XYZ
    if (req.method === "GET") {
      if (jobId) {
        const job = ExtractionJobManager.getJob(jobId);
        if (!job) return errorResponse(res, 404, `Job ${jobId} not found`);
        return successResponse(res, { job });
      }

      const status = url.searchParams.get("status");
      const jurisdiction = url.searchParams.get("jurisdiction");
      const jobs = ExtractionJobManager.listJobs({ status, jurisdiction });
      return successResponse(res, { totalJobs: jobs.length, jobs });
    }

    // POST /api/regulatory/jobs — Create and execute an extraction job
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return errorResponse(res, 400, "Invalid JSON payload in request body.");
        }
      }

      const job = ExtractionJobManager.createJob(body || {});
      
      // Execute the job asynchronously or synchronously
      const runImmediate = body?.runSync !== false;
      if (runImmediate) {
        try {
          const completedJob = await ExtractionJobManager.runJob(job.jobId);
          return successResponse(res, { job: completedJob });
        } catch (execErr) {
          return errorResponse(res, 500, `Job execution failed: ${execErr.message}`, { job });
        }
      }

      return successResponse(res, { job, message: "Job scheduled successfully" });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/jobs] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}

