import React from "react";

import { Activity, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployerBreads = ({
  jobsPosted,
  applicationsReceived,
}: {
  jobsPosted?: any;
  applicationsReceived?: any;
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Jobs Posted
          </CardTitle>
          {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{jobsPosted ?? 0}</div>
          <p className="text-xs text-muted-foreground">
            +{jobsPosted ?? 0} since last hour
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Applications Received
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{applicationsReceived ?? 0}</div>
          <p className="text-xs text-muted-foreground">
            +{applicationsReceived ?? 0} in the last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerBreads;
