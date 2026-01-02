import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T | 'actions';
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  title: string;
  isLoading?: boolean;
  searchKey?: keyof T; // Key to filter by
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  title,
  isLoading,
  searchKey
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item => {
    if (!searchQuery || !searchKey) return true;
    const value = item[searchKey];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return String(value).includes(searchQuery);
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {searchKey && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-8"
              />
            </div>
          )}
          {onAdd && (
            <Button onClick={onAdd} className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead key={i}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col, i) => (
                    <TableCell key={i}>
                      {col.key === 'actions' ? (
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                          )}
                          {onDelete && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this item.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => onDelete(item)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      ) : col.render ? (
                        col.render(item)
                      ) : (
                        item[col.key] as React.ReactNode
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Pagination Numbers */}
          <div className="flex items-center gap-1">
            {(() => {
              const items = [];
              // Always show first page
              items.push(
                <Button
                  key={1}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setPage(1)}
                >
                  1
                </Button>
              );

              // Start ellipsis
              if (page > 3) {
                items.push(<span key="start-ellipsis" className="px-1">...</span>);
              }

              // Middle pages (current - 1, current, current + 1)
              for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                items.push(
                  <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setPage(i)}
                  >
                    {i}
                  </Button>
                );
              }

              // End ellipsis
              if (page < totalPages - 2) {
                items.push(<span key="end-ellipsis" className="px-1">...</span>);
              }

              // Always show last page if > 1
              if (totalPages > 1) {
                items.push(
                  <Button
                    key={totalPages}
                    variant={page === totalPages ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                );
              }
              return items;
            })()}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
