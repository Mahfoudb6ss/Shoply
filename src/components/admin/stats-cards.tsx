import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Stat = {
  title: string;
  value: string;
  change?: string;
};

export const StatsCards = ({ stats }: { stats: Stat[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map(stat => (
      <Card key={stat.title}>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            {stat.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stat.value}</div>
          {stat.change && <p className="text-xs text-muted-foreground">{stat.change}</p>}
        </CardContent>
      </Card>
    ))}
  </div>
);

