import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

const WinLossPieChart = ({
  wins,
  losses,
}: {
  wins: number;
  losses: number;
}) => {
  const winLossData = [
    { name: "Wins", value: wins },
    { name: "Losses", value: losses },
  ];

  return (
    <PieChart
      colors={["#3b82f6", "#ef4444"]}
      series={[
        {
          data: [
            { id: 0, value: winLossData[0].value },
            { id: 1, value: winLossData[1].value },
          ],
          innerRadius: "75%",
          paddingAngle: 1,
          cornerRadius: 3,
        },
      ]}
      width={200}
      height={200}
      sx={{ border: "none" }}
    >
      <Typography>Test</Typography>
    </PieChart>
  );
};

export default WinLossPieChart;
