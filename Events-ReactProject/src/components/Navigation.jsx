import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex flexDirection="row" gap={4} position="fixed" top={0} padding={2}>
      <Link to="/">
        <Button>🏠</Button>
      </Link>
      <Link to="/new">
        <Button>➕ new event</Button>
      </Link>
    </Flex>
  );
};
