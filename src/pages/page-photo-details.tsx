import Container from "../components/container";
import Text from "../components/text";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import type { Photo } from "../context/photos/models/photo";

export default function PagePhotoDetails() {
  const isLoadingPhoto = false;
  const photo = {
    id: "123",
    title: "Olá mundo!",
    imageId: "portrait-tower.png",
    albums: [
      { id: "3421", title: "Album 1" },
      { id: "123", title: "Album 2" },
      { id: "456", title: "Album 3" },
    ],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator />
      </header>
    </Container>
  );
}