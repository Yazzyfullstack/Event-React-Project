import React from "react";
import { useLoaderData } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/UI/EventSearch";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Flex>
      <EventSearch events={events} />
    </Flex>
  );
};
