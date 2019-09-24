import React, { useMemo } from 'react';
import { Button, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import Page from '../components/Page';
import propTypes from '../components/propTypes';
import ArticleCardList from '../components/ArticleCardList';
import ArticleCardListItem from '../components/ArticleCardListItem';
import ArticleCard from '../components/ArticleCard';
import Layout from '../components/Layout';
import RouterLink from '../components/RouterLink';

const useStyles = makeStyles({
  root: {},
  readMore: {
    margin: '3rem 0'
  }
});

function Articles({ width, location: { search } }) {
  const classes = useStyles();
  const params = new URLSearchParams(search);
  const offsetParam = params.get('offset');
  const offset = useMemo(() => Number(offsetParam) || 0, [offsetParam]);
  const articles = {
    offset,
    data: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  };

  const renderRows = () => {
    const rows = [];
    for (let i = !articles.offset ? 1 : 0; i < articles.data.length; i += 3) {
      const rowArticles = articles.data.slice(i).slice(0, 3);
      const components = rowArticles.map(() => (
        <ArticleCardListItem
          square
          width="calc(100% / 3)"
          height={400}
          /**
           *  If there is 1 or 2 items in a row,
           *  allow the last item to have a border
           *  so it won't look awkward
           */
          enableLastBorder={isWidthUp('md', width) && rowArticles.length !== 3}
        >
          <ArticleCard
            square
            height={400}
            imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
            title="Promise Tracker Annual Report (Executive Summary)"
            date="2019-09-16T17:53:45.289Z"
          />
        </ArticleCardListItem>
      ));
      rows.push(
        isWidthUp('md', width) ? (
          <ArticleCardListItem row enableLastBorder>
            {components}
          </ArticleCardListItem>
        ) : (
          components
        )
      );
    }

    return rows;
  };
  return (
    <Page>
      <Layout justify="center">
        <ArticleCardList>
          {!articles.offset && (
            <ArticleCardListItem>
              <ArticleCard
                jumbo
                height={400}
                date="2019-09-16T17:53:45.289Z"
                title="Promise Tracker Annual Report (Executive Summary)"
                imgSrc="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
                description="August 2019 marks the sixth anniversary of Hassan Rouhani’s presidency. His sixth year in office was a difficult one, both for him and for the people of Iran. The economic and political crises that began earlier seem to continue into his seventh year. "
              />
            </ArticleCardListItem>
          )}

          {renderRows()}
        </ArticleCardList>

        <Button
          classes={{ root: classes.readMore }}
          component={RouterLink}
          to={`/articles?offset=${offset + 1}`}
          color="primary"
        >
          READ MORE
        </Button>
      </Layout>
    </Page>
  );
}

Articles.propTypes = {
  location: propTypes.shape({
    search: propTypes.string
  }).isRequired,
  width: propTypes.string.isRequired
};

export default withWidth()(Articles);
