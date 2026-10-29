-- Matches the existing production table, without replaying historical deliveries.
CREATE TABLE IF NOT EXISTS inquiry_deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inquiry_id INTEGER NOT NULL REFERENCES inquiries(id),
  state TEXT NOT NULL CHECK(state IN ('pending', 'sent', 'failed')),
  created_at TEXT NOT NULL,
  provider_status TEXT
);
CREATE INDEX IF NOT EXISTS idx_inquiry_deliveries_inquiry ON inquiry_deliveries(inquiry_id, created_at);
