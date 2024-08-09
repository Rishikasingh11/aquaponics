import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export function AdminDashboardSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="max-w-sm h-[20px]" />
        <Skeleton className="h-[20px] w-20" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-5 w-5" aria-label="Select all" />
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Event Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Starting Date</TableHead>
              <TableHead>Ending Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-5" aria-label="Select row" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-full" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          0 of 0 row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardSkeleton;
