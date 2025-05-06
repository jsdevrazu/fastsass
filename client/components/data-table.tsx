import * as React from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";
import { EmptyState } from "@/components/ui/empty-state"
import { Briefcase } from "lucide-react";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalRows: number;
    onPaginationChange: (pageIndex: number, pageSize: number) => void;
    searchKey?: string
    page: number;
    limit: number;
    enableSearch?: boolean
    searchPlaceholder?:string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalRows,
    searchKey = 'fullName',
    page,
    limit,
    onPaginationChange,
    searchPlaceholder,
    enableSearch = true
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        manualPagination: true,
        rowCount: totalRows,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: { pageIndex: page, pageSize: limit },
        },
    });


    return (
        <div className="space-y-4">
            {
                enableSearch && <div className="flex items-center py-4">
                <Input
                    placeholder={searchPlaceholder ?? 'Filter by name...'}
                    value={(table.getColumn(searchKey ?? '')?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey ?? '')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            }
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="cursor-pointer capitalize" onClick={header.column.getToggleSortingHandler()}>
                                        <div className="flex items-center">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === "asc" ? <IoArrowUpSharp size={16} /> : header.column.getIsSorted() === "desc" ? <IoArrowDownSharp size={16} /> : null}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className=" capitalize" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    <EmptyState
                                        icon={Briefcase}
                                        title="No jobs available"
                                        description="There are currently no job listings available. Please check back later or create an alert to be notified when new jobs are posted."
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">Row Per Page</p>
                    <Select
                        value={String(limit)}
                        onValueChange={(value) => onPaginationChange(page, Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={limit} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={String(pageSize)}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {page + 1} of {Math.ceil(totalRows / limit)}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => onPaginationChange(0, limit)} disabled={page === 0}>
                            <MdOutlineKeyboardDoubleArrowLeft size={20} />
                        </Button>
                        <Button variant="outline" onClick={() => onPaginationChange(page - 1, limit)} disabled={page === 0}>
                            <MdKeyboardArrowLeft size={20} />
                        </Button>
                        <Button variant="outline" onClick={() => onPaginationChange(page + 1, limit)} disabled={(page + 1) * limit >= totalRows}>
                            <MdKeyboardArrowRight size={20} />
                        </Button>
                        <Button variant="outline" onClick={() => onPaginationChange(Math.ceil(totalRows / limit) - 1, limit)} disabled={(page + 1) * limit >= totalRows}>
                            <MdKeyboardDoubleArrowRight size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}