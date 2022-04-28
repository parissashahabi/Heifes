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
                             listCount
}: {
  id?: string;
  inputPlaceholderLabel?: string;
  page?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  listCount?: number;
}): ReactElement => {
  return (
    <>
      <Row
        // justify="space-between"
        align="middle"
        className={style["header-list"]}
      >
        <Row justify="space-between" align="middle"  className={style["title"]}>
          <Typography.Title level={5}>
            {title}
          </Typography.Title>
           <Space>
                <Badge count={listCount} />
              </Space> 
        </Row>
        <Row align="middle" className={style["search-box"]}>
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
