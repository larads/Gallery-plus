import Container from "../components/container";
import Text from "../components/text";
import type { Photo } from "../context/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../context/albums/components/albums-list-selectable";
import { useParams } from "react-router";
import useAlbums from "../context/albums/hooks/use-albums";
import usePhoto from "../context/photos/hooks/use-photo";
import React from "react";
import { Dialog, DialogOverlay, DialogClose } from "../components/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ButtonIcon from "../components/button-icon";
import XIcon from "../assets/icons/x.svg?react";
import ZoomIcon from "../assets/icons/zoom.svg?react";
import cn from "classnames";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { photo, isLoadingPhoto, previousPhotoId, nextPhotoId, deletePhoto } = usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();
  const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();
  const [isZoomOpen, setIsZoomOpen] = React.useState(false);

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      await deletePhoto(photo!.id);
    });
  }
  
  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada</div>;
  }

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator
          loading={isLoadingPhoto}
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <div className="relative group">
              <ImagePreview
                src={imageUrl}              
                title={photo?.title}
                imageClassName="h-[21rem]"
              />
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute top-2 right-2 w-10 h-10 bg-background-secondary/80 hover:bg-background-secondary rounded flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Ampliar imagem"
              >
                <ZoomIcon className="w-6 h-6 fill-white" />
              </button>
            </div>
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingPhoto ? (
            <Button
            variant="destructive"
            onClick={handleDeletePhoto}
            disabled={isDeletingPhoto}
          >
            {isDeletingPhoto ? "Excluindo..." : "Excluir"}
          </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogPrimitive.Portal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] w-auto h-auto max-w-[90vw] max-h-[90vh]",
              "z-[60] translate-x-[-50%] translate-y-[-50%]",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            )}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <DialogClose asChild>
                <ButtonIcon 
                  icon={XIcon} 
                  variant="ghost" 
                  className="absolute top-2 right-2 z-10 bg-background-secondary/80 hover:bg-background-secondary"
                />
              </DialogClose>
              <img
                src={imageUrl}
                alt={photo?.title}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
    </Container>
  );
}