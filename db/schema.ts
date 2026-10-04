import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const leads = sqliteTable("leads", {id:text("id").primaryKey(),name:text("name").notNull(),email:text("email").notNull(),phone:text("phone").notNull(),service:text("service").notNull(),mode:text("mode").notNull(),preferredDate:text("preferred_date").notNull(),period:text("period").notNull(),message:text("message").notNull(),createdAt:text("created_at").notNull(),consentVersion:text("consent_version").notNull(),status:text("status").notNull().default("new")});

export const siteContent = sqliteTable("site_content", {id:text("id").primaryKey(),json:text("json").notNull(),revision:text("revision").notNull(),updatedAt:text("updated_at").notNull()});
