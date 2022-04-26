import { Col, Image, Row, Skeleton } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useParams } from "react-router-dom";
import { photoApis, searchPhotoApis } from "../../../../api";
import Loading from "../../../../utils/loading/loading";
export function ListPhoto({ listPhoto, isTopicPage, isSearchPage, keyWord }) {

  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSearch, setPageSearch] = useState(2);

  useEffect(() => {
    setList(listPhoto);
  }, [listPhoto]);

  const topic = useParams().id;
  const loadMoreData = () => {
    setPage(page + 1);
    setPageSearch(pageSearch + 1);
    if (isTopicPage) {
      photoApis
        .getPhotosTopPic(page, topic)
        .then((res) => setList([...list, ...res]));
    } else if (isSearchPage) {
      searchPhotoApis
        .LoadMoreSearchPhoto(keyWord, pageSearch + 1)
        .then((res) => {
          setList([...list, ...res.results]);
        });
    } else {
      photoApis.getLoadMoreData(page).then((res) => setList([...list, ...res]));
    }
  };

  if (list.length === 0)
    return (
      <div className="loading">
        <Loading />
      </div>
    );
    
  return (
    <Fragment>
      <InfiniteScroll
        scrollThreshold={0.7}
        dataLength={list.length}
        next={loadMoreData}
        loader={<LoadingMoreData />}
        hasMore={true}
        style={{ overflow: "hidden" }}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {list.map((item, index) => (
              <Image
                title={`View The photo by ${item?.user?.name}`}
                key={index}
                src={item?.urls?.small}
                width="100%"
                height="auto"
                style={{ padding: 7 }}
                placeholder={<Skeleton.Image active></Skeleton.Image>}
                preview={{
                  src: item?.urls?.full,
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </Fragment>
  );
}

function LoadingMoreData() {
  return (
    <Row gutter={[0, 4]}>
      <Col span={8}>
        <Skeleton.Image
          active
          style={{
            width: "420px",
            height: "600px",
          }}
        ></Skeleton.Image>
      </Col>
      <Col span={8}>
        <Skeleton.Image
          active
          style={{
            width: "420px",
            height: "600px",
          }}
        ></Skeleton.Image>
      </Col>
      <Col span={8}>
        <Skeleton.Image
          active
          style={{
            width: "420px",
            height: "600px",
          }}
        ></Skeleton.Image>
      </Col>
    </Row>
  );
}
