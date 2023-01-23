import axios from "axios";
import {
  Box,
  Text,
  Card,
  CardBody,
  Link,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface PackageInfoProps {
  name: string;
}

interface Response {
  info: Info;
}

interface Info {
  home_page: string;
  package_url: string;
  summary: string;
}

export default function PackageInfo(props: PackageInfoProps) {
  const [data, setData] = useState<Response>();
  async function getPackageData() {
    const url = `https://pypi.org/pypi/${props.name}/json`;
    const data = await axios
      .get<Response>(url)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <>
      <Box
        width={"full"}
        border={"1px solid #d3d3d3"}
        boxShadow={"1px 1px 2px 1px rgb(0 0 0 / 5%)"}
        padding={2}
        marginBottom={2}
      >
        <Link
          _hover={{ textDecoration: "none", fontWeight: "500" }}
          href={data?.info.package_url}
        >
          <Text color={"#006dad"}>{props.name}</Text>
          <Text>{data?.info.summary}</Text>
        </Link>
      </Box>
    </>
  );
}
