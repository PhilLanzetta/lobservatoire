import React, { useState, useRef, useLayoutEffect } from "react"
import { Link } from "gatsby"
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table"
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort"
import { useTheme } from "@table-library/react-table-library/theme"
import { getTheme } from "@table-library/react-table-library/baseline"
import THEME from "./projectListTheme"

const ProjectList = ({ projects }) => {
  const theme = useTheme(getTheme());
  console.log(projects)

  return (
    <div className="project-list-view">
      <Table data={{ nodes: projects }} theme={theme}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell sortKey="TITLE">Project</HeaderCell>
                <HeaderCell sortKey="TYPOLOGY">Typology</HeaderCell>
                <HeaderCell sortKey="LOCATION">Location</HeaderCell>
                <HeaderCell sortKey="YEAR">Year</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map(item => (
                <React.Fragment key={item.id}>
                  <Row item={item}>
                    <Cell>
                      <Link to={`/projects/${item.slug}`}>
                        {item.projectName}
                      </Link>
                    </Cell>
                    <Cell>
                      <Link to={`/projects/${item.slug}`}>{item.typology}</Link>
                    </Cell>
                    <Cell>{item.geographicRegion}</Cell>
                    <Cell>{item.year}</Cell>
                  </Row>
                </React.Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  )
}

export default ProjectList
