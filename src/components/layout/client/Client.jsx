import PropTypes from "prop-types";

import { Box } from "@mui/material";
export const Client = ({ children }) => {
  return <Box sx={{ display: "flex" }}>{children}</Box>;
};

Client.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Client;
