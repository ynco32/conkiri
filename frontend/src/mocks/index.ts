import { sightHandlers } from './handler/sight.handler';
import { sightReviewHandlers } from './handler/sightReview.handler';
import { concertHandlers } from './handler/concert.handler';
import { sharingHandlers } from './handler/sharing.handler';
import { concertSightHandlers } from './handler/concertSight.handler';
import { seatsHandlers } from './handler/seats.handler';
import { userHandlers } from './handler/user.handler';
import { sectionHandlers } from './handler/sections.handler';
import { ticketingHandlers } from './handler/ticketing.handler';
import { seatScrapHandlers } from './handler/seatScrap.handler';
import { sharingCommentHandlers } from './handler/sharingComment.handler';

export const handlers = [
  ...sightHandlers,
  ...concertHandlers,
  ...sharingHandlers,
  ...sightReviewHandlers,
  ...concertSightHandlers,
  ...seatsHandlers,
  ...userHandlers,
  ...sectionHandlers,
  ...ticketingHandlers,
  ...seatScrapHandlers,
  ...sharingCommentHandlers,
];
