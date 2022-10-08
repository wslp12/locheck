/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import styled, { CSSObject } from '@emotion/styled';
import React, { ReactNode } from 'react';
import { Columns, ListItem } from './ListItem';

interface ListProps<T> {
  data?: T;
  columns: Columns<T>;
  children: ListContainerChildren<T>[] | ListContainerChildren<T> | ReactNode;
  /**
   * 리스트의 헤더부분 랜더링 여부 입니다.
   */
  disabledHeader?: boolean;
  /**
   * 최상위 div 스타일입니다.
   */
  rootStyle?: CSSObject;
  /**
   * 리스트 헤더 스타일 입니다.
   */
  headerStyle?: CSSObject;
  /**
   * 리스트 아이템 텍스트 스타일 입니다.
   */
  fontStyle?: CSSObject;
}
type ListContainerChildren<T> = (item: Columns<T>) => JSX.Element;

function List<T>(props: ListProps<T>) {
  const {
    children,
    columns,
    disabledHeader = false,
    rootStyle,
    headerStyle,
    fontStyle,
  } = props;

  const getListContainerChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child) => child(columns));
    } else if (typeof children === 'function') {
      return children(columns);
    }
    return children;
  };

  return (
    <div>
      {disabledHeader ? null : (
        <div className="raid-column">
          {columns.map((item) => (
            <div key={item.key.toString()} className="raid-cell">
              {item.display.toString()}
            </div>
          ))}
        </div>
      )}
      {getListContainerChildren()}
    </div>
  );
}

List.item = ListItem;

export default List;
