import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex, Heading } from "@chakra-ui/react";
import { EventsContext } from "../Context";
import "@fontsource/pacifico";
import "@fontsource/open-sans";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { users, categories } = useLoaderData();

  return (
    <Flex
      bgImage="../image/event.jpg"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      bgPosition="center"
      zIndex={-1}
    >
      <Heading
        fontSize="8xl"
        color="purple"
        textAlign="left"
        padding={4}
        position="fixed"
        bottom="20px"
        zIndex={0}
        width="450px"
      >
        Come and see your event!
      </Heading>

      <Navigation />
      <EventsContext.Provider value={{ users, categories }}>
        <Outlet />
      </EventsContext.Provider>
    </Flex>
  );
};
