import Container from "../components/container";
import PhotosList from "../components/photos-list";
import AlbumsFilter from "../context/albums/components/albums-filer";
import useAlbums from "../context/albums/hooks/use-albums";
import usePhotos from "../context/photos/hooks/use-photos";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { photos, isLoadingPhotos } = usePhotos();
  
  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />
      
      <PhotosList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
}