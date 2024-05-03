/**
 * @author Vidura Adikari https://www.viduraadikari.com/
 */

import HomePage from "@/page/HomePage";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <main>
      <Container sx={{py: 5}}>
        <HomePage/>
      </Container>
    </main>
  );
}
