"use client";

import {
  useFieldArray,
  useWatch,
  type UseFormReturn,
  type ControllerRenderProps,
} from "react-hook-form";
import { GraduationCap, LinkIcon, UserPlus, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import type { RegistrationFormValues } from "@/lib/validation";
import { academicYears, normalizePhoneInput } from "@/lib/validation";
import { tracks } from "@/data/tracks";
import { eventConfig } from "@/config/event";
import { cn } from "@/lib/utils";

type Field<T extends keyof RegistrationFormValues> = ControllerRenderProps<
  RegistrationFormValues,
  T
>;
type Form = UseFormReturn<RegistrationFormValues>;

/* ── Step 1: Personal information ─────────────────────────── */

export function PersonalStep({ form }: { form: Form }) {
  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete="name"
                placeholder="e.g. Ananya Sharma"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@college.edu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  onChange={(event) => {
                    const digits = normalizePhoneInput(event.target.value);
                    /* Write back to the DOM so stripped keystrokes (e.g. letters)
                       never linger when React skips a re-render on equal values. */
                    event.target.value = digits;
                    field.onChange(digits);
                  }}
                />
              </FormControl>
              <FormDescription>
                Exactly 10 digits, e.g. 9876543210 — we only use it for event-day
                coordination.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="college"
        render={({ field }) => (
          <FormItem>
            <FormLabel>College / Institution</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete="organization"
                placeholder="Your college or university name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="academicYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current academic year</FormLabel>
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      <span className="flex items-center gap-2">
                        <GraduationCap
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-muted-foreground"
                        />
                        {year}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                GitHub / portfolio{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  inputMode="url"
                  placeholder="https://github.com/your-handle"
                />
              </FormControl>
              <FormDescription className="flex items-center gap-1.5">
                <LinkIcon aria-hidden="true" className="h-3 w-3" />
                Builders of all levels welcome — an empty field is fine.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

/* ── Step 2: Participation details ────────────────────────── */

function ModeCard({
  field,
  value,
  title,
  body,
  icon,
}: {
  field: Field<"mode">;
  value: RegistrationFormValues["mode"];
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  const selected = field.value === value;
  return (
    <Label
      htmlFor={`mode-${value}`}
      className={cn(
        "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-colors",
        selected
          ? "border-acid/60 bg-acid/[0.06]"
          : "border-border bg-surface hover:border-line"
      )}
    >
      <RadioGroupItem
        value={value}
        id={`mode-${value}`}
        className="mt-0.5 data-[state=checked]:border-acid data-[state=checked]:text-acid"
      />
      <span className="flex-1">
        <span className="flex items-center gap-2 font-semibold text-foreground">
          {icon}
          {title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {body}
        </span>
      </span>
    </Label>
  );
}

export function ParticipationStep({ form }: { form: Form }) {
  const mode = useWatch({ control: form.control, name: "mode" });
  const isTeam = mode === "Team";

  /* Keep teammates in sync with the chosen team size. */
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "teammates",
  });

  const syncTeammates = (size: number) => {
    const current = form.getValues("teammates");
    const required = Math.max(0, size - 1);
    const next = Array.from({ length: required }, (_, i) => current[i] ?? {
      name: "",
      email: "",
      college: "",
    });
    replace(next);
  };

  const handleModeChange = (value: string) => {
    const nextMode = value as RegistrationFormValues["mode"];
    form.setValue("mode", nextMode, { shouldValidate: false });
    if (nextMode === "Team") {
      form.setValue("teamSize", Math.max(2, form.getValues("teamSize")));
      syncTeammates(Math.max(2, form.getValues("teamSize")));
    } else {
      form.setValue("teamSize", 1);
      replace([]);
    }
  };

  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How will you participate?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={handleModeChange}
                className="grid gap-3 sm:grid-cols-2"
              >
                <ModeCard
                  field={field}
                  value="Individual"
                  title="Individual"
                  body="Flying solo — you can still team up on event day."
                  icon={<UserPlus aria-hidden="true" className="h-4 w-4 text-acid" />}
                />
                <ModeCard
                  field={field}
                  value="Team"
                  title="Team"
                  body={`Register with up to ${eventConfig.teamSize.max} builders total.`}
                  icon={<Users aria-hidden="true" className="h-4 w-4 text-acid" />}
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isTeam && (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Byte Me"
                    aria-label="Team name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => {
              const handleSize = (value: string) => {
                const size = Number(value);
                field.onChange(size);
                syncTeammates(size);
              };
              return (
                <FormItem>
                  <FormLabel>Team size (including you)</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={handleSize}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[2, 3, 4].map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size} members
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You will add {field.value - 1} teammate
                    {field.value - 1 === 1 ? "" : "s"} in the next step.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      )}

      <FormField
        control={form.control}
        name="trackId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred track</FormLabel>
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a track" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tracks.map((track) => (
                  <SelectItem key={track.id} value={track.id}>
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: track.color }}
                      />
                      {track.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Tracks can change until team formation ends on Day 1.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Your idea or interests{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="A sentence or two about what you might build — rough ideas welcome."
                aria-describedby="idea-count"
              />
            </FormControl>
            <p
              id="idea-count"
              className="text-right text-xs text-muted-foreground"
              aria-live="polite"
            >
              {field.value.length}/600
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

/* ── Step 3: Team members ─────────────────────────────────── */

export function TeammatesStep({ form }: { form: Form }) {
  const { fields } = useFieldArray({
    control: form.control,
    name: "teammates",
  });
  const mode = useWatch({ control: form.control, name: "mode" });

  if (mode === "Individual") {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <Users
          aria-hidden="true"
          className="mx-auto h-8 w-8 text-muted-foreground/60"
        />
        <p className="mt-3 font-heading text-base font-bold">
          Individual registration
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          No teammates required. You can still join or form a team during the
          team-formation session on Day 1.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
        Add the details for your {fields.length} teammate
        {fields.length === 1 ? "" : "s"}. Each teammate should be a different
        person with their own email address.
      </p>
      {fields.map((member, index) => (
        <fieldset
          key={member.id}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <legend className="mono-label px-2 text-[0.5625rem] text-acid">
            Teammate {index + 2} of{" "}
            {index + 1 + fields.length}
          </legend>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={`teammates.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Teammate's full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name={`teammates.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        inputMode="email"
                        placeholder="teammate@college.edu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teammates.${index}.college`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      College{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Same college? Leave blank"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}

/* ── Step 4: Review & submit ───────────────────────────────── */

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/60 py-2.5 last:border-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-40 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-sm text-foreground/95">
        {value}
      </dd>
    </div>
  );
}

export function ReviewStep({
  form,
  goToStep,
}: {
  form: Form;
  goToStep: (step: 0 | 1 | 2) => void;
}) {
  const values = useWatch({ control: form.control }) as RegistrationFormValues;
  const track = tracks.find((t) => t.id === values.trackId);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-surface p-5">
        <header className="flex items-center justify-between">
          <h4 className="mono-label text-[0.5625rem] text-muted-foreground">
            Personal information
          </h4>
          <button
            type="button"
            onClick={() => goToStep(0)}
            className="text-xs font-semibold text-acid hover:underline focus-visible:outline-offset-4"
          >
            Edit
          </button>
        </header>
        <dl className="mt-2">
          <ReviewRow label="Full name" value={values.fullName} />
          <ReviewRow label="Email" value={values.email} />
          <ReviewRow label="Contact" value={values.phone} />
          <ReviewRow label="College" value={values.college} />
          <ReviewRow label="Academic year" value={values.academicYear} />
          {values.portfolioUrl && (
            <ReviewRow label="Portfolio" value={values.portfolioUrl} />
          )}
        </dl>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <header className="flex items-center justify-between">
          <h4 className="mono-label text-[0.5625rem] text-muted-foreground">
            Participation
          </h4>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-xs font-semibold text-acid hover:underline focus-visible:outline-offset-4"
          >
            Edit
          </button>
        </header>
        <dl className="mt-2">
          <ReviewRow
            label="Mode"
            value={
              values.mode === "Team"
                ? `Team — ${values.teamName} (${values.teamSize} members)`
                : "Individual"
            }
          />
          <ReviewRow
            label="Track"
            value={track ? `${track.name}` : "—"}
          />
          {values.idea && <ReviewRow label="Idea" value={values.idea} />}
        </dl>
      </section>

      {values.mode === "Team" && values.teammates.length > 0 && (
        <section className="rounded-xl border border-border bg-surface p-5">
          <header className="flex items-center justify-between">
            <h4 className="mono-label text-[0.5625rem] text-muted-foreground">
              Teammates
            </h4>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-xs font-semibold text-acid hover:underline focus-visible:outline-offset-4"
            >
              Edit
            </button>
          </header>
          <dl className="mt-2">
            {values.teammates.map((member, i) => (
              <ReviewRow
                key={i}
                label={`Member ${i + 2}`}
                value={`${member.name} — ${member.email}${member.college ? ` · ${member.college}` : ""}`}
              />
            ))}
          </dl>
        </section>
      )}

      <FormField
        control={form.control}
        name="agreedToRules"
        render={({ field }) => {
          /* Show the consent error only after a real submit attempt or
              checkbox interaction — not eagerly on arriving at the step. */
          const attempted =
            form.formState.submitCount > 0 ||
            Boolean(form.formState.touchedFields.agreedToRules);
          return (
            <FormItem>
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      className="mt-0.5 data-[state=checked]:border-acid data-[state=checked]:bg-acid data-[state=checked]:text-acid-foreground"
                    />
                  </FormControl>
                  <Label
                    htmlFor="agreedToRules"
                    className="text-sm font-normal leading-relaxed text-foreground/90"
                  >
                    I have read and accept the{" "}
                    <a
                      href="#rules"
                      className="font-semibold text-acid hover:underline"
                    >
                      event rules
                    </a>{" "}
                    and understand that my registration details will be handled
                    according to the organizers&apos; privacy notice.
                  </Label>
                </div>
                {attempted && <FormMessage />}
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
}
