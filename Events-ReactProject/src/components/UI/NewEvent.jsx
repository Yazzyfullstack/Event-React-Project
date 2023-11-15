import {
  Flex,
  Button,
  Input,
  Stack,
  Select,
  Card,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { EventsContext } from "../../Context";
import { useActionData } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// Send request to add event
export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const newId = await json.id;

  return {
    status: response.status,
    id: newId,
  };
};

export const NewEvent = () => {
  const [sentToast, setSentToast] = useState(false);
  const { users, categories } = useContext(EventsContext);
  const toast = useToast();

  // use data from POST request for status and newId
  const response = useActionData();
  let id;
  if (response != undefined) {
    id = response.id;
  }

  let status;
  if (response != undefined) {
    status = response.status;
  }

  //if response
  if (response != undefined && sentToast === false) {
    const status = response.status;
    switch (status) {
      case 201:
        toast({
          title: "Success!",
          description: `You're event was added succesfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
        break;
      default:
        toast({
          title: "Woah",
          description: `Something happened! Not sure what "${status}" means though...`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
    }
  }

  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
      <Card gap={4} padding={4}>
        <CardHeader>
          <Heading>Create a event</Heading>
        </CardHeader>

        {/* Add button after adding an event succesfully, to direct to event page */}
        {status === 201 && (
          <Flex justify="center">
            <Link to={`/event/${id}`}>
              <Button size="lg" color="green.500">
                Visit your event!
              </Button>
            </Link>
          </Flex>
        )}

        <Text align="center">
          Fill in the information about your event below
        </Text>
        <Form method="post" id="new-event-form">
          <Stack spacing={3}>
            <Input
              placeholder="Event title"
              type="text"
              name="title"
              required="required"
            />
            <Input
              placeholder="Description"
              type="text"
              name="description"
              required="required"
            />
            <Input
              placeholder="Image url"
              type="url"
              name="image"
              required="required"
            />
            <Input
              type="datetime-local"
              variant="outline"
              placeholder="Start time"
              name="startTime"
              required="required"
            />
            <Input
              type="datetime-local"
              variant="outline"
              placeholder="End time"
              name="endTime"
              required="required"
            />
            <Input
              placeholder="Location"
              type="text"
              name="location"
              required="required"
            />

            <Select
              placeholder="Category"
              name="categoryIds"
              required="required"
            >
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id} type="number">
                    {category.name}
                  </option>
                );
              })}
            </Select>

            <Select
              placeholder="Select user"
              name="createdBy"
              required="required"
            >
              {users.map((user) => {
                return (
                  <option value={user.id} key={user.id} type="number">
                    {user.name}
                  </option>
                );
              })}
            </Select>
            {/* Hide submit button after adding an event succesfully to prevent multiple adds */}
            {status != 201 && (
              <Button type="submit" variant="ghost">
                Submit
              </Button>
            )}
          </Stack>
        </Form>
      </Card>
    </Flex>
  );
};
