#!/usr/bin/env node
/**
 * Validate bastion SSH environment variables for local ops.
 */
require("dotenv").config();

const REQUIRED = ["SSH_HOST", "SSH_USER", "SSH_PRIVATE_KEY_PATH"];

const missing = REQUIRED.filter(
  (name) => !String(process.env[name] || "").trim(),
);

if (missing.length) {
  console.error(
    "Missing or empty required environment variables:",
    missing.join(", "),
  );
  console.error(
    "Copy .env.example to .env and fill values. See docs/ENVIRONMENTS.md",
  );
  process.exit(1);
}

console.log("All required bastion environment variables are set.");
