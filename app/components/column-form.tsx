import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FRAME_FRAME_LOAD_TYPES,
  FRAME_FRAME_LOAD_TYPE_LABELS,
} from "@/app/utils/frameloadTypes";
import { Column } from "../types";

interface ColumnFormProps {
  columns: Column[];
  onColumnChange: (index: number, field: keyof Column, value: any) => void;
}

export default function ColumnForm({
  columns,
  onColumnChange,
}: ColumnFormProps) {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
        Column Details
      </h2>
      {columns.map((column, index) => (
        <div
          key={index}
          className="space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
              {index + 1}
            </span>
            Column {index + 1}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Length <span className="text-emerald-500 text-xs">(m)</span>
              </Label>
              <Input
                type="number"
                value={column.length}
                onChange={(e) =>
                  onColumnChange(
                    index,
                    "length",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Moment of Inertia{" "}
                <span className="text-emerald-500 text-xs">(I)</span>
              </Label>
              <Input
                type="number"
                value={column.momentOfInertia}
                onChange={(e) =>
                  onColumnChange(
                    index,
                    "momentOfInertia",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Support Type
              </Label>
              <Select
                value={column.supportType}
                onValueChange={(value) =>
                  onColumnChange(index, "supportType", value)
                }
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-lg shadow-lg">
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="hinged">Hinged</SelectItem>
                  <SelectItem value="roller">Roller</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Load Type
              </Label>
              <Select
                value={column.loadType}
                onValueChange={(value) =>
                  onColumnChange(index, "loadType", value)
                }
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-lg shadow-lg">
                  {Object.entries(FRAME_FRAME_LOAD_TYPES).map(
                    ([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {FRAME_FRAME_LOAD_TYPE_LABELS[value]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            {column.loadType !== "NONE" && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">
                  Load Magnitude{" "}
                  <span className="text-emerald-500 text-xs">(kN)</span>
                </Label>
                <Input
                  type="number"
                  value={column.loadMagnitude}
                  onChange={(e) =>
                    onColumnChange(
                      index,
                      "loadMagnitude",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
