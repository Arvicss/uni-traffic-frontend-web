import { UserAvatar } from "@/components/common/UserAvatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { AuditLog } from "@/lib/types";
import { format } from "date-fns";
import { AuditLogTypeBadge } from "../../common/AuditLogTypeBadge";

export const AuditLogTable = ({
  auditLogData
}: {
  auditLogData: AuditLog[];
}) => {
  return (
    <div className="overflow-hidden rounded-md border flex-1">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="max-w-[10vw]">User</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="max-w-[10vw]">Details</TableHead>
            <TableHead className="text-left">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogData.map((auditLog) => (
            <TableRow
              key={auditLog.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
            >
              <TableCell className="max-w-[15vw]">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={`${auditLog.actor?.firstName} ${auditLog.actor?.lastName}`}
                    className="h-8 w-8"
                  />
                  <div>
                    <p className="font-medium">
                      {`${auditLog.actor?.firstName} ${auditLog.actor?.lastName}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{auditLog.actor?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <AuditLogTypeBadge status={auditLog.actionType} />
              </TableCell>
              <TableCell className="max-w-[10vw]">
                <p className="truncate w-[10vw]">{auditLog.details}</p>
              </TableCell>
              <TableCell className="text-left">
                {format(auditLog.createdAt, "MMM dd, yyyy hh:mm:ss a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
