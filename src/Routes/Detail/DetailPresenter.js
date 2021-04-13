import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  width: 60%;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
  font-size: 15px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const Link = styled.a`
  display: inline-block;
  width: 40px;
  text-align: center;
  background-color: yellow;
  color: black;
  font-weight: 800;
  border-radius: 5px;
`;

const Video = styled.a`
  display: inline-block;

  font-size: 18px;
  background-color: red;
  color: white;
  font-weight: 800;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const Image = styled.div`
  display: inline-block;
  background-image: url(${(props) => props.bgPoster});
  width: 180px;
  height: 260px;
  border-radius: 4px;
  background-position: center center;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const DetailPresenter = ({ result, loading, error, isMovie }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>

            <Divider>🎞</Divider>

            <Item>
              {result.imdb_id && (
                <Link
                  href={`https://www.imdb.com/title/${result.imdb_id}/`}
                  target="_blank"
                >
                  IMDb
                </Link>
              )}
            </Item>
          </ItemContainer>

          <Overview>{result.overview}</Overview>
          <ItemContainer>
            {result.videos.results.map((video) => (
              <Video
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
              >
                YouTube
              </Video>
            ))}
          </ItemContainer>

          <ItemContainer>
            <Item>
              {result.production_companies &&
                result.production_companies.map((company, index) =>
                  index === result.production_companies.length - 1
                    ? company.name
                    : `${company.name} / `
                )}
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === result.production_countries.length - 1
                    ? country.name
                    : `${country.name} / `
                )}
            </Item>
          </ItemContainer>

          {!isMovie && (
            <div>
              {result.seasons.map((season) => (
                <Image
                  bgPoster={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                />
              ))}
            </div>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
