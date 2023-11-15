import React from "react";
import { Heading, Image, Button, Flex, Text } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { EditEvent } from "../components/UI/EditEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();

  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
      <Flex
        bg="white"
        align="center"
        justify="center"
        direction="column"
        minWidth="280px"
        maxW="30vw"
        paddingBottom={4}
        gap={4}
        borderRadius={10}
        zIndex={1}
      >
        <Image
          src={event.image}
          alt={event.title}
          width="100%"
          height="100%"
          borderTopRadius={8}
        />
        <Heading>{event.title}</Heading>
        <Text fontWeight="bold">{event.description}</Text>

        <Flex
          direction="column"
          align="center"
          gap={1}
          flexWrap="wrap"
          padding={4}
        >
          <Text>📅 {date}</Text>
          <Text>
            🕑 {start} - {end}
          </Text>
          <Text align="center">📌 {event.location}</Text>
          <CategoryCard event={event} />
        </Flex>

        <Flex padding={2}>
          <UserCard userId={event.createdBy} />
        </Flex>

        <Flex gap={4} flexWrap="wrap" justifyContent="center">
          <EditEvent event={event} />
          <Flex gap={4}>
            <DeleteEvent event={event} />

            <Link to="/">
              <Button size="sm">Home</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
