/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { CSSObject } from '@emotion/styled';
import React from 'react';

export type Columns<T> = [
  ...{
    key: keyof T;
    display: keyof T;
  }[]
];

interface ListItemProps<T> {
  cellData: T;
  columns?: Columns<T>;
  /**
   * 리스트 아이템의 최상위 div 요소 스타일 입니다.
   */
  rootStyle?: CSSObject;
  /**
   * 리스트 아이템의 Span 요소 스타일 입니다.
   */
  fontStyle?: CSSObject;
}

function ListItem<T>(props: ListItemProps<T>) {
  const { columns = [], cellData, rootStyle, fontStyle } = props;
  return (
    <div className="raid-column">
      {columns?.map((column) => {
        return (
          <div
            key={String(column.key)}
            className="raid-cell"
            style={{
              width: '160px',
            }}
          >
            {cellData[column.display] as any}
          </div>
        );
      })}
    </div>
  );
}

export { ListItem };
