import crypto from 'crypto';

export default function generateUniqueId(byteCount?: number) {
  // Do we really need to generate 1024 bytes?? That's 2^(1024 * 8).
  // 32 bytes is already enough for 256-bit
  return crypto.randomBytes(byteCount ?? 32).toString('hex');
}
