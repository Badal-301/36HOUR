import { z } from "zod";
import { eventConfig } from "@/config/event";
import { tracks } from "@/data/tracks";

/**
 * Registration validation — zod schemas backing react-hook-form.
 * Each step validates its own field group via `trigger(fields)`.
 */

const trackIds = tracks.map((t) => t.id) as [string, ...string[]];

export const academicYears = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Postgraduate / Research",
] as const;

/** Phone is mandatory and must contain exactly 10 digits (Indian mobile format). */
const phonePattern = /^[0-9]{10}$/;

/**
 * Normalizes raw phone input into a plain 10-digit string:
 * strips everything except digits, unwraps a leading "+91" / "91" (12 digits)
 * or "0" (11 digits) trunk prefix, and caps the result at 10 digits.
 * Used by the phone input so pasted values like "+91 98765 43210" land
 * cleanly as "9876543210".
 */
export function normalizePhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export const registrationSchema = z
  .object({
    /* Step 1 — personal information */
    fullName: z
      .string()
      .trim()
      .min(3, "Enter your full name (at least 3 characters)"),
    email: z.email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(1, "Contact number is required")
      .refine((v) => phonePattern.test(v), {
        message: "Enter a valid 10-digit mobile number (digits only, e.g. 9876543210)",
      }),
    college: z.string().trim().min(3, "Your college or institution is required"),
    academicYear: z.enum(academicYears, {
      message: "Select your current academic year",
    }),
    portfolioUrl: z
      .string()
      .trim()
      .refine((v) => v === "" || /^https?:\/\/.+\..+/.test(v), {
        message: "Enter a valid URL starting with http:// or https://",
      }),

    /* Step 2 — participation details */
    mode: z.enum(["Individual", "Team"], {
      message: "Select how you want to participate",
    }),
    teamName: z.string().trim(),
    teamSize: z
      .number()
      .int()
      .min(eventConfig.teamSize.min, `Team size must be at least ${eventConfig.teamSize.min}`)
      .max(eventConfig.teamSize.max, `Teams can have at most ${eventConfig.teamSize.max} members`),
    trackId: z.enum(trackIds, { message: "Choose your preferred track" }),
    idea: z.string().trim().max(600, "Keep the idea description under 600 characters"),

    /* Step 3 — team members */
    teammates: z.array(
      z.object({
        name: z.string().trim(),
        email: z.string().trim(),
        college: z.string().trim(),
      })
    ),

    /* Step 4 — consent */
    agreedToRules: z.boolean().refine((v) => v === true, {
      message: "You must accept the event rules and privacy notice to submit",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "Team") {
      if (data.teamName.length < 3) {
        ctx.addIssue({
          code: "custom",
          path: ["teamName"],
          message: "Enter a team name (at least 3 characters)",
        });
      }
      if (data.teamSize < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["teamSize"],
          message: "A team needs at least 2 members — or register as an individual",
        });
      }
      const required = Math.max(0, data.teamSize - 1);
      if (data.teammates.length !== required) {
        ctx.addIssue({
          code: "custom",
          path: ["teammates"],
          message: `Add details for ${required} additional teammate${required === 1 ? "" : "s"}`,
        });
      }
      data.teammates.forEach((member, index) => {
        if (member.name.trim().length < 3) {
          ctx.addIssue({
            code: "custom",
            path: ["teammates", index, "name"],
            message: "Enter the teammate's full name",
          });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())) {
          ctx.addIssue({
            code: "custom",
            path: ["teammates", index, "email"],
            message: "Enter a valid email address",
          });
        }
        if (
          member.email.trim().toLowerCase() === data.email.trim().toLowerCase()
        ) {
          ctx.addIssue({
            code: "custom",
            path: ["teammates", index, "email"],
            message: "Teammate email must differ from your own email",
          });
        }
      });
    } else {
      if (data.teamSize !== 1) {
        ctx.addIssue({
          code: "custom",
          path: ["teamSize"],
          message: "Individual registration is for one participant",
        });
      }
      if (data.teammates.length !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["teammates"],
          message: "Individual registrations cannot include teammates",
        });
      }
    }
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

/** Field groups validated per wizard step (indexes match step numbers). */
export const stepFields: (keyof RegistrationFormValues)[][] = [
  ["fullName", "email", "phone", "college", "academicYear", "portfolioUrl"],
  ["mode", "teamName", "teamSize", "trackId", "idea"],
  ["teammates"],
  ["agreedToRules"],
];
