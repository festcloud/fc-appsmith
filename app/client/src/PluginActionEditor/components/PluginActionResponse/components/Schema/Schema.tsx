import { Flex } from "@appsmith/ads";
import React, { useEffect, useState } from "react";
import { DatasourceStructureContext } from "entities/Datasource";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatasourceStructureById,
  getIsFetchingDatasourceStructure,
  getPluginIdFromDatasourceId,
  getPluginDatasourceComponentFromId,
} from "ee/selectors/entitiesSelector";
import type { AppState } from "ee/reducers";
import { fetchDatasourceStructure } from "actions/datasourceActions";
import history from "utils/history";
import { datasourcesEditorIdURL } from "ee/RouteBuilder";
import { DatasourceComponentTypes } from "api/PluginApi";
import { getPluginActionDebuggerState } from "PluginActionEditor/store";
import { SchemaDisplayStatus, StatusDisplay } from "./StatusDisplay";
import DatasourceSelector from "./DatasourceSelector";
import { SchemaTables } from "./SchemaTables";
import { DatasourceEditEntryPoints } from "constants/Datasource";
import AnalyticsUtil from "ee/utils/AnalyticsUtil";
import { isEmpty, omit } from "lodash";
import { getQueryParams } from "utils/URLUtils";
import { getCurrentPageId } from "selectors/editorSelectors";
import { TableColumns } from "./TableColumns";
import { BOTTOMBAR_HEIGHT } from "./constants";

interface Props {
  datasourceId: string;
  datasourceName: string;
  currentActionId: string;
}

const Schema = (props: Props) => {
  const dispatch = useDispatch();

  const datasourceStructure = useSelector((state) =>
    getDatasourceStructureById(state, props.datasourceId),
  );

  const { responseTabHeight } = useSelector(getPluginActionDebuggerState);

  const pluginId = useSelector((state) =>
    getPluginIdFromDatasourceId(state, props.datasourceId),
  );

  const currentPageId = useSelector(getCurrentPageId);

  const [selectedTable, setSelectedTable] = useState<string>();

  const isLoading = useSelector((state: AppState) =>
    getIsFetchingDatasourceStructure(state, props.datasourceId),
  );

  const pluginDatasourceForm = useSelector((state) =>
    getPluginDatasourceComponentFromId(state, pluginId || ""),
  );

  useEffect(
    function resetSelectedTable() {
      setSelectedTable(undefined);
    },
    [props.datasourceId],
  );

  useEffect(
    function fetchDatasourceStructureEffect() {
      function fetchStructure() {
        if (
          props.datasourceId &&
          datasourceStructure === undefined &&
          pluginDatasourceForm !==
            DatasourceComponentTypes.RestAPIDatasourceForm
        ) {
          dispatch(
            fetchDatasourceStructure(
              props.datasourceId,
              true,
              DatasourceStructureContext.QUERY_EDITOR,
            ),
          );
        }
      }

      fetchStructure();
    },
    [props.datasourceId, datasourceStructure, dispatch, pluginDatasourceForm],
  );

  useEffect(
    function selectFirstTable() {
      if (!selectedTable && datasourceStructure?.tables?.length && !isLoading) {
        setSelectedTable(datasourceStructure.tables[0].name);
      }
    },
    [selectedTable, props.datasourceId, isLoading, datasourceStructure],
  );

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const editDatasource = () => {
    const entryPoint = DatasourceEditEntryPoints.QUERY_EDITOR_DATASOURCE_SCHEMA;

    AnalyticsUtil.logEvent("EDIT_DATASOURCE_CLICK", {
      datasourceId: props.datasourceId,
      pluginName: "",
      entryPoint: entryPoint,
    });

    const url = datasourcesEditorIdURL({
      basePageId: currentPageId,
      datasourceId: props.datasourceId,
      params: { ...omit(getQueryParams(), "viewMode"), viewMode: false },
      generateEditorPath: true,
    });

    history.push(url);
  };

  const getStatusState = () => {
    if (isLoading) return SchemaDisplayStatus.SCHEMA_LOADING;

    if (!datasourceStructure) return SchemaDisplayStatus.NOSCHEMA;

    if (datasourceStructure && "error" in datasourceStructure)
      return SchemaDisplayStatus.FAILED;

    if (isEmpty(datasourceStructure)) return SchemaDisplayStatus.CANTSHOW;

    return null;
  };

  const statusState = getStatusState();

  const renderStatus = () => {
    if (!statusState) {
      return null;
    }

    return (
      <>
        <Flex padding="spaces-3">
          <DatasourceSelector
            datasourceId={props.datasourceId}
            datasourceName={props.datasourceName}
          />
        </Flex>
        <StatusDisplay
          editDatasource={editDatasource}
          errorMessage={
            datasourceStructure?.error && "message" in datasourceStructure.error
              ? datasourceStructure.error.message
              : ""
          }
          state={statusState}
        />
      </>
    );
  };

  const renderContent = () => {
    if (statusState) {
      return null;
    }

    return (
      <Flex h="100%">
        <SchemaTables
          currentActionId={props.currentActionId}
          datasourceId={props.datasourceId}
          datasourceName={props.datasourceName}
          datasourceStructure={datasourceStructure}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
        <TableColumns
          datasourceStructure={datasourceStructure}
          isLoading={isLoading}
          selectedTable={selectedTable}
        />
      </Flex>
    );
  };

  return (
    <Flex
      flexDirection="column"
      gap="spaces-3"
      height={`${responseTabHeight - BOTTOMBAR_HEIGHT}px`}
      overflow="hidden"
    >
      {renderStatus()}
      {renderContent()}
    </Flex>
  );
};

export { Schema };
