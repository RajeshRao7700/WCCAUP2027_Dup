import type { CoreCommitteeMember } from "@/types/conference";
import { initialsOf } from "@/lib/format";

export function CommitteeCard({ member }: { member: CoreCommitteeMember }) {
  const fullName = `${member.firstName} ${member.lastName}`;
  return (
    <li className="card-lift flex gap-5 rounded-xl border border-border bg-card p-6">
      <div className="shrink-0">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={`Portrait of ${fullName}`}
            loading="lazy"
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="surface-deep grid h-16 w-16 place-items-center rounded-lg">
            <span className="text-sm font-semibold tracking-widest text-deep-foreground">
              {initialsOf(member.firstName, member.lastName)}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold">{fullName}</h3>
        {member.designation ? (
          <p className="mt-1 text-sm text-primary">{member.designation}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {[member.organization, member.country].filter(Boolean).join(" · ")}
        </p>
        {member.bio ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
        ) : null}
      </div>
    </li>
  );
}
