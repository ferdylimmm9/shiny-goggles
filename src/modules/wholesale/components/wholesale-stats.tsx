import { Card, Flex } from '@mantine/core';
import { ClockClockwise } from '@phosphor-icons/react';
import { useGetWholesalesStats } from 'api-hooks/wholesale-order/query';
import { ProfitIcon } from 'assets/svg';
import { string2money } from 'common/utils/string';
import LoaderView from 'components/loader-view';
import Text from 'components/text';
import { color } from 'styles/color';

export default function WholesaleStats() {
  const queryGetStats = useGetWholesalesStats();
  const size = 24;
  return (
    <LoaderView query={queryGetStats}>
      {({ data }) => {
        return (
          <Flex wrap="wrap" gap={16} mb={16}>
            <Card miw={300} radius="md">
              <Flex direction="row" gap={16} align="start">
                <div
                  style={{
                    borderRadius: '50%',
                    backgroundColor: color.red90,
                    padding: 16,
                    height: size + 32,
                    width: size + 32,
                  }}
                >
                  <ClockClockwise size={size} color={color.red40} />
                </div>
                <div>
                  <Text textVariant="body3">Total Unpaid Invoice</Text>
                  <Text
                    textVariant="body2"
                    color={color.red40}
                    fontWeightVariant="semibold"
                  >
                    {string2money(data.unpaidOrderTotalCount)} Invoices
                  </Text>
                  <Text textVariant="body3">Total Unpaid</Text>
                  <Text
                    textVariant="body2"
                    fontWeightVariant="semibold"
                    color={color.red40}
                  >
                    {string2money(data.unpaidOrderTotal)}
                  </Text>
                </div>
              </Flex>
            </Card>
            <Card miw={300} radius="md">
              <Flex direction="row" gap={16} align="start">
                <div
                  style={{
                    borderRadius: '50%',
                    backgroundColor: color.green90,
                    padding: 16,
                    height: size + 32,
                    width: size + 32,
                  }}
                >
                  <ProfitIcon
                    width={size}
                    height={size}
                    color={color.green40}
                  />
                </div>
                <div>
                  <Text textVariant="body3">Total Paid Invoice</Text>
                  <Text
                    textVariant="body2"
                    fontWeightVariant="semibold"
                    color={color.green40}
                  >
                    {string2money(data.paidOrderTotalCount)} Invoices
                  </Text>
                  <Text textVariant="body3">Total Paid</Text>
                  <Text
                    textVariant="body2"
                    fontWeightVariant="semibold"
                    color={color.green40}
                  >
                    {string2money(data.paidOrderTotalCount)}
                  </Text>
                </div>
              </Flex>
            </Card>
          </Flex>
        );
      }}
    </LoaderView>
  );
}
