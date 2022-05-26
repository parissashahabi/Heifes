import { ReactElement } from "react";
import { Row, Typography, Input,Space, Badge} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "../../functions/debounce";
import style from "./index.module.scss";

const SearchBarHeader = ({
  inputPlaceholderLabel,
  page,
  onSearch,
  title,
                             listCount,
    noTitle
}: {
  id?: string;
  inputPlaceholderLabel?: string;
  page?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  listCount?: number;
    noTitle?: boolean;
}): ReactElement => {
  return (
    <>
      <Row
        // justify="space-between"
        align="middle"
        className={style["header-list"]}
      >
          {noTitle ? null :  <Row justify="space-between" align="middle"  className={style["title"]}>
              <Typography.Title level={5}>
                  {title}
              </Typography.Title>
              <Space>
                  <Badge count={listCount} />
              </Space>
          </Row>}

        <Row align="middle" className={style["search-box"]} style={noTitle ? undefined : { marginRight: "30px"}}>
          <SearchOutlined />
          <Input
            id={`${page}-searchbox`}
            onChange={debounce(onSearch, 500)}
            // defaultValue={filters?.search}
            placeholder={inputPlaceholderLabel}
          />
        </Row>
      </Row>
    </>
  );
};

export default SearchBarHeader;
