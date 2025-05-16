export default function RecruitmentMetrics() {
  // This would typically fetch data from an API
  // For now, we'll use static data

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Time to Hire (Days)</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">18</span>
            <span className="text-sm text-green-500 mb-1">-12% vs last month</span>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: "65%" }}></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Target: 15 days</span>
            <span>Industry avg: 24 days</span>
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Cost per Hire</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">$3,250</span>
            <span className="text-sm text-green-500 mb-1">-8% vs last month</span>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: "78%" }}></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Target: $3,000</span>
            <span>Industry avg: $4,200</span>
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Application to Hire Ratio</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">24:1</span>
            <span className="text-sm text-amber-500 mb-1">+5% vs last month</span>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: "45%" }}></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Target: 20:1</span>
            <span>Industry avg: 30:1</span>
          </div>
        </div>
      </div>

      <div className="bg-background p-6 rounded-lg border">
        <h3 className="font-medium mb-4">Monthly Hiring Metrics</h3>
        <div className="h-[300px] flex items-end gap-2">
          {[65, 45, 75, 58, 62, 80, 70, 55, 72, 68, 75, 82].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-colors"
                style={{ height: `${height * 2}px` }}
              ></div>
              <span className="text-xs text-muted-foreground mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>Hires</span>
          </div>
          <span>Total Annual Hires: 245</span>
        </div>
      </div>
    </div>
  )
}
