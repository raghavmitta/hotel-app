import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      if (process.env.META_ACCESS_TOKEN && process.env.META_PIXEL_ID) {
        try {
          await sendToMetaConversionsAPI(lead);
        } catch (metaError) {
          console.error("Meta API error (lead still saved):", metaError);
        }
      }
      
      res.status(201).json({ success: true, lead });
    } catch (error) {
      console.error("Lead submission error:", error);
      res.status(400).json({ success: false, error: "Invalid lead data" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  return httpServer;
}

async function sendToMetaConversionsAPI(lead: any) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;
  
  if (!accessToken || !pixelId) {
    return;
  }

  const eventData = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          em: [hashData(lead.email)],
          ph: [hashData(lead.phone)],
          fn: [hashData(lead.name.split(" ")[0] || "")],
          ln: [hashData(lead.name.split(" ").slice(1).join(" ") || "")],
        },
        custom_data: {
          hotel_name: lead.hotelName,
          quantity: lead.quantity,
          message: lead.message,
        },
      },
    ],
    access_token: accessToken,
  };

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pixelId}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }
  );

  if (!response.ok) {
    throw new Error(`Meta API error: ${response.statusText}`);
  }
}

function hashData(data: string): string {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
}
