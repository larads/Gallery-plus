import Container from "../components/container";
import PhotosList from "../components/photos-list";
import AlbumsFilter from "../context/albums/components/albums-filer";
import useAlbums from "../context/albums/hooks/use-albums";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  
  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />
      
      <PhotosList
        photos={[
          {
            id: "123",
            title: "Olá mundo!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "3421", title: "Album 1" },
              { id: "123", title: "Album 2" },
              { id: "456", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}