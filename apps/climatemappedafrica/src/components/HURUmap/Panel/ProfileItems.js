import { Loading } from "@hurumap/core";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { Fragment, memo } from "react";

import CategoryHeader from "@/climatemappedafrica/components/HURUmap/CategoryHeader";
import KeyMetric from "@/climatemappedafrica/components/HURUmap/KeyMetric";
import SubcategoryHeader from "@/climatemappedafrica/components/HURUmap/SubcategoryHeader";
import formatNumericalValue from "@/climatemappedafrica/utils/formatNumericalValue";
import slugify from "@/climatemappedafrica/utils/slugify";

const Chart = dynamic(
  () => import("@/climatemappedafrica/components/HURUmap/Chart"),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ProfileItems = memo(
  function ProfileItems({
    categories,
    dataNotAvailable,
    getSecondaryIndicator,
    getSecondaryMetric,
    primaryProfile,
    secondaryProfile,
    geoCode,
  }) {
    return (
      <>
        {categories.map((category, categoryIndex) => (
          <Fragment key={category.tite}>
            <CategoryHeader
              description={category?.description}
              icon={category.icon}
              id={slugify(category.title)}
              title={category.title}
            />
            {category.children.map((child, subcategoryIndex) => (
              <Fragment key={child.title}>
                <SubcategoryHeader
                  description={child?.description}
                  id={slugify(`${category.title}-${child.title}`)}
                  title={child.title}
                />
                <Grid
                  container
                  sx={({ typography }) => ({
                    marginTop: typography.pxToRem(24),
                  })}
                >
                  {child?.metrics?.map(
                    (
                      {
                        label,
                        parentMetric,
                        value,
                        value_display_format: valueDisplayFormat,
                        method,
                        metadata,
                      },
                      metricIndex,
                    ) => {
                      const displayFormat = valueDisplayFormat ?? method;
                      const parentValue = parentMetric?.value;
                      const parentDisplayFormat =
                        parentMetric?.value_display_format ??
                        parentMetric?.method;
                      const parentFormattedValue = parentValue
                        ? formatNumericalValue({
                            value: parentValue,
                            method: parentDisplayFormat,
                          })
                        : undefined;
                      const secondaryMetric = getSecondaryMetric(
                        categoryIndex,
                        subcategoryIndex,
                        metricIndex,
                      );
                      const secondaryValue = secondaryMetric?.value;
                      const secondaryDisplayFormat =
                        secondaryMetric?.value_display_format ??
                        secondaryMetric?.method;

                      return (
                        <Grid
                          item
                          container
                          lg={secondaryProfile ? 12 : 4}
                          key={label}
                          sx={({ typography }) => ({
                            marginBottom: {
                              lg: typography.pxToRem(14),
                            },
                            marginLeft: {
                              lg: secondaryProfile ? typography.pxToRem(18) : 0,
                            },
                            maxWidth: {
                              lg: secondaryProfile
                                ? typography.pxToRem(224)
                                : "100%",
                            },
                            "&:first-of-type": {
                              marginLeft: 0,
                            },
                          })}
                        >
                          <Grid item xs={12} lg={secondaryProfile ? 6 : 12}>
                            <KeyMetric
                              title={label}
                              formattedValue={formatNumericalValue({
                                value,
                                method: displayFormat,
                              })}
                              parentFormattedValue={parentFormattedValue}
                              color="primary"
                              value={value}
                              displayFormat={displayFormat}
                              metadata={metadata}
                              sx={({ typography }) => ({
                                maxWidth: {
                                  lg: typography.pxToRem(350),
                                },
                              })}
                            />
                          </Grid>
                          {secondaryMetric && (
                            <Grid item xs={12} lg={6}>
                              <KeyMetric
                                title={secondaryMetric.label ?? undefined}
                                formattedValue={formatNumericalValue({
                                  value: secondaryValue,
                                  method: secondaryDisplayFormat,
                                })}
                                parentFormattedValue={parentFormattedValue}
                                color="secondary"
                                value={secondaryValue}
                                displayFormat={secondaryDisplayFormat}
                                metadata={secondaryMetric.metric}
                                sx={({ typography }) => ({
                                  maxWidth: {
                                    lg: typography.pxToRem(350),
                                  },
                                })}
                              />
                            </Grid>
                          )}
                        </Grid>
                      );
                    },
                  )}
                </Grid>
                {child.children.map(({ index, ...indicator }) => (
                  <Chart
                    key={index}
                    variant="primary"
                    {...indicator}
                    geoCode={geoCode}
                    secondaryIndicator={getSecondaryIndicator(
                      categoryIndex,
                      subcategoryIndex,
                      indicator.indicator.id,
                    )}
                    isCompare={!!secondaryProfile}
                    profileNames={{
                      primary:
                        indicator.indicator?.data?.length > 0
                          ? primaryProfile.geography.name
                          : `${primaryProfile.geography.name} ${dataNotAvailable}`,
                      secondary:
                        getSecondaryIndicator(
                          categoryIndex,
                          subcategoryIndex,
                          indicator.indicator.id,
                        )?.indicator?.data?.length > 0
                          ? secondaryProfile?.geography?.name
                          : `${secondaryProfile?.geography?.name} ${dataNotAvailable}`,
                    }}
                  />
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </>
    );
  },

  (prevProps, nextProps) => {
    if (prevProps.geoCode === nextProps.geoCode) {
      return true;
    }
    return false; // props are not equal -> update the component
  },
);

ProfileItems.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
      description: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
    }),
  ),

  dataNotAvailable: PropTypes.string,
  getSecondaryIndicator: PropTypes.func,
  getSecondaryMetric: PropTypes.func,
  geoCode: PropTypes.string,
  primaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          }),
        ),
      }),
    ),
  }),

  secondaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          }),
        ),
      }),
    ),
  }),
};

export default ProfileItems;
