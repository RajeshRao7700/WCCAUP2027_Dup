import { useQuery } from "@tanstack/react-query";
import { conferenceService } from "@/api/conferenceService";
import { speakerService } from "@/api/speakerService";
import { committeeService } from "@/api/committeeService";
import { trackService } from "@/api/trackService";
import { importantDateService } from "@/api/importantDateService";
import { workshopService } from "@/api/workshopService";
import { sponsorService } from "@/api/sponsorService";
import { mediaPartnerService } from "@/api/mediaPartnerService";
import { attendeeService, fileService, updateService } from "@/api/fileService";
import { accommodationService, programService, venueService } from "@/api/contentService";
import { registrationService } from "@/api/registrationService";

const staleTime = 5 * 60 * 1000;

export const useConference = () =>
  useQuery({ queryKey: ["conference"], queryFn: conferenceService.getConference, staleTime });

export const useAbout = () =>
  useQuery({ queryKey: ["about"], queryFn: conferenceService.getAbout, staleTime });

export const useHighlights = () =>
  useQuery({ queryKey: ["highlights"], queryFn: conferenceService.getHighlights, staleTime });

export const useSpeakers = () =>
  useQuery({ queryKey: ["speakers"], queryFn: speakerService.getSpeakers, staleTime });

export const useSpeaker = (id: string) =>
  useQuery({ queryKey: ["speaker", id], queryFn: () => speakerService.getSpeaker(id), staleTime });

export const useCommittee = () =>
  useQuery({ queryKey: ["committee"], queryFn: committeeService.getCommittee, staleTime });

export const useTracks = () =>
  useQuery({ queryKey: ["tracks"], queryFn: trackService.getTracks, staleTime });

export const useImportantDates = () =>
  useQuery({
    queryKey: ["important-dates"],
    queryFn: importantDateService.getImportantDates,
    staleTime,
  });

export const useWorkshopBanners = () =>
  useQuery({
    queryKey: ["workshop-banners"],
    queryFn: workshopService.getWorkshopBanners,
    staleTime,
  });

export const useSponsors = () =>
  useQuery({ queryKey: ["sponsors"], queryFn: sponsorService.getSponsors, staleTime });

export const useMediaPartners = () =>
  useQuery({
    queryKey: ["media-partners"],
    queryFn: mediaPartnerService.getMediaPartners,
    staleTime,
  });

export const useAttendeesFrom = () =>
  useQuery({ queryKey: ["attendees-from"], queryFn: attendeeService.getAttendeesFrom, staleTime });

export const useFiles = () =>
  useQuery({ queryKey: ["files"], queryFn: fileService.getFiles, staleTime });

export const useUpdates = () =>
  useQuery({ queryKey: ["updates"], queryFn: updateService.getUpdates, staleTime });

export const useProgram = () =>
  useQuery({ queryKey: ["program"], queryFn: programService.getProgram, staleTime });

export const useVenue = () =>
  useQuery({ queryKey: ["venue"], queryFn: venueService.getVenue, staleTime });

export const useHotels = () =>
  useQuery({ queryKey: ["hotels"], queryFn: accommodationService.getHotels, staleTime });

export const useRegistrationCategories = () =>
  useQuery({
    queryKey: ["registration-categories"],
    queryFn: registrationService.getCategories,
    staleTime,
  });
