import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  value: integer("value").notNull().default(0),
  stage: text("stage").notNull().default("Nowy kontakt"),
  nextAction: text("next_action").notNull().default("Skontaktować się"),
  dueDate: text("due_date"),
  source: text("source").notNull().default("Ręcznie"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [index("idx_leads_stage_updated").on(table.stage, table.updatedAt)]);

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  clientName: text("client_name").notNull(),
  type: text("type").notNull().default("Strona firmowa"),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  status: text("status").notNull().default("Planowanie"),
  price: integer("price").notNull().default(0),
  deadline: text("deadline"),
  progress: integer("progress").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  websiteUrl: text("website_url").notNull().default(""),
  publicCode: text("public_code").notNull().default(""),
  clientEmail: text("client_email").notNull().default(""),
  clientCompany: text("client_company").notNull().default(""),
  clientAddress: text("client_address").notNull().default(""),
  clientNip: text("client_nip").notNull().default(""),
  scope: text("scope").notNull().default(""),
  nextStep: text("next_step").notNull().default("Ustalenie kolejnego etapu"),
  clientNote: text("client_note").notNull().default(""),
  contractStatus: text("contract_status").notNull().default("Szkic"),
  contractNumber: text("contract_number").notNull().default(""),
  startDate: text("start_date"),
  providerName: text("provider_name").notNull().default("Zielona Marka — Łukasz Staniewicz"),
  providerAddress: text("provider_address").notNull().default(""),
  providerNip: text("provider_nip").notNull().default(""),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  index("idx_projects_published_updated").on(table.published, table.updatedAt),
  index("idx_projects_public_code").on(table.publicCode),
]);

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("Do zrobienia"),
  priority: text("priority").notNull().default("Normalny"),
  dueDate: text("due_date"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [index("idx_tasks_status_updated").on(table.status, table.updatedAt)]);

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  budget: text("budget").notNull().default(""),
  message: text("message").notNull(),
  status: text("status").notNull().default("Nowe"),
  createdAt: text("created_at").notNull(),
}, (table) => [index("idx_inquiries_status_created").on(table.status, table.createdAt)]);
