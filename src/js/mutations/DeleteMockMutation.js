import { graphql } from "react-relay";
import commitMutation from "./commitMutation";

const mutation = graphql`
  mutation DeleteMockMutation($input: DeleteMockInput!) {
    deleteMock(input: $input) {
      deletedMock {
        id
      }
    }
  }
`;

function commit({ input, parentID, onCompleted, onError }) {
  commitMutation({
    mutation,
    variables: {
      input
    },
    configs: [
      {
        type: "RANGE_DELETE",
        parentID,
        connectionKeys: [
          {
            key: "ProjectDetail_mocks"
          }
        ],
        pathToConnection: ["project", "mocks"],
        deletedIDFieldName: ["deletedMock"]
      }
    ],
    onCompleted,
    onError
  });
}

export default { commit };
