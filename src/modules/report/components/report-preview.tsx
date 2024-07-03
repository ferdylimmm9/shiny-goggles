import { Card } from '@mantine/core';
import { TotalModel } from 'api-hooks/report/model';
import { Package2Icon, ProfitIcon, SalesIcon } from 'assets/svg';
import { string2money } from 'common/utils/string';
import Text from 'components/text';
import { color } from 'styles/color';

interface ReportPreviewProps {
  total: TotalModel;
}

export default function ReportPreview(props: ReportPreviewProps) {
  const { total } = props;
  const data = [
    {
      title: 'Total Quantity',
      content: string2money(total.quantity),
      icon: <Package2Icon color={color.primary40} />,
      color: color.primary40,
      backgroundColor: color.primary90,
    },
    {
      title: 'Total Sales',
      content: string2money(total.sales),
      icon: <SalesIcon color={color.blue40} />,
      color: color.blue40,
      backgroundColor: color.blue90,
    },
    {
      title: 'Total Net Profit',
      content: string2money(total.netProfit),
      icon: <ProfitIcon color={color.red70} />,
      color: color.red70,
      backgroundColor: color.secondary90,
    },
    {
      title: 'Total Gross Profit',
      content: string2money(total.grossProfit),
      icon: <ProfitIcon color={color.red70} />,
      color: color.red70,
      backgroundColor: color.secondary90,
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      {data.map((item) => {
        return (
          <Card
            key={`${item.title}${item.content}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
            }}
            radius={12}
          >
            <div
              style={{
                padding: 12,
                borderRadius: '50%',
                backgroundColor: item.backgroundColor,
                height: 52,
                width: 52,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </div>
            <div>
              <Text textVariant="body2" c={color.primary10}>
                {item.title}
              </Text>
              <Text
                textVariant="title3"
                fontWeightVariant="semibold"
                c={item.color}
              >
                {item.content}
              </Text>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
