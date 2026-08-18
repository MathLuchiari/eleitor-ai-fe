CREATE TYPE "public"."candidate_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('GOVERNMENT_PLAN', 'OFFICIAL_DOCUMENT', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('OFFICIAL_WEBSITE', 'TSE', 'GOVERNMENT', 'OTHER');--> statement-breakpoint
CREATE TABLE "parties" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"acronym" varchar(20) NOT NULL,
	"number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "parties_acronym_unique" UNIQUE("acronym"),
	CONSTRAINT "parties_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"party_id" uuid NOT NULL,
	"status" "candidate_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "government_plans" (
	"id" uuid PRIMARY KEY NOT NULL,
	"candidate_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY NOT NULL,
	"government_plan_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" "document_type" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"document_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"publisher" varchar(255) NOT NULL,
	"type" "source_type" NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "test_embeddings" CASCADE;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "government_plans" ADD CONSTRAINT "government_plans_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_government_plan_id_government_plans_id_fk" FOREIGN KEY ("government_plan_id") REFERENCES "public"."government_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;