package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.*;
import diplomskiProjekat.ReserveTableApp.model.*;
import diplomskiProjekat.ReserveTableApp.repository.ReservationRepository;
import diplomskiProjekat.ReserveTableApp.service.*;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;
import diplomskiProjekat.ReserveTableApp.config.*;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

@Service
public class ReservationServiceImpl implements ReservationService {


    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    TableService tableService;

    @Autowired
    FacilityService facilityService;

    @Autowired
    EmailService emailService;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    private  UserService userService;

    @Autowired
    private ThreadPoolTaskScheduler taskScheduler;

    ScheduledFuture future;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public CreateReservationDTO createReservation(ReservationDTO dto) {

        List<Reservation> all = reservationRepository.findAllByTable(tableService.getOne(dto.getTable_id()));
        LocalTime dtoEnd = dto.getStartReservation().plusMinutes(dto.getDuration());
        for(Reservation r : all){
            LocalTime reservationEnd = r.getStartReservation().plusMinutes(r.getDuration());
            if(r.getStartReservation().equals(dto.getStartReservation())){
                return null;
            }
            if(dto.getStartReservation().isAfter(r.getStartReservation()) && dtoEnd.isBefore(reservationEnd)){
                return null;
            }
            if(dto.getStartReservation().isBefore(r.getStartReservation()) && dtoEnd.isAfter(r.getStartReservation()) && dtoEnd.isBefore(reservationEnd)){
                return  null;
            }
        }

        Table table = tableService.getOne(dto.getTable_id());
        Reservation reservation = new Reservation(customerService.findOneByEmail(dto.getCustomerEmail()),table,dto.getDuration(),dto.getStartReservation(),facilityService.getOne(table.getFacility().getId()));
        reservationRepository.save(reservation);

        table.getReservationList().add(reservation);
        Customer c = customerService.findOneByEmail(dto.getCustomerEmail());
        c.getReservations().add(reservation);
        customerService.saveCustomer(c);
        Facility f = facilityService.getOne(table.getFacility().getId());
        f.getReservations().add(reservation);
        table.getReservationList().add(reservation);
        CreateReservationDTO createReservationDTO = new CreateReservationDTO(new FacilityDTO(f),facilityService.findAll(),new CustomerDTO(c));

        //schedule task
        LocalTime notificationTime = dto.getStartReservation().minus(15, ChronoUnit.MINUTES);
        LocalDateTime notificationDate = LocalDate.now().atTime(notificationTime);
        ZonedDateTime zonedNotificationDateTime = ZonedDateTime.of(notificationDate, ZoneId.systemDefault());

        LocalDateTime pomocni = LocalDate.now().now().atTime(LocalTime.now());
        ZonedDateTime pomocniZone = ZonedDateTime.of(pomocni, ZoneId.systemDefault());

        ScheduledFuture future =  taskScheduler.schedule(
                new RunnableTask(c,reservation,mailSender),
                Instant.from(pomocniZone)
        );

        this.future = future;

         taskScheduler.schedule(
                new NotificationTask(c,reservation,simpMessagingTemplate),
                Instant.from(pomocniZone)
        );
        return  createReservationDTO;
    }

    @Override
    public List<ReservationDTO> findAllByCustomer(Customer customer) {

        List<ReservationDTO> returnList = new ArrayList<>();
        /*for(Reservation r : reservationRepository.findAllByCustomerOrderByReservationDateDesc(customer)){
            ReservationDTO dto = new ReservationDTO(r);
            returnList.add(dto);
        }*/
        return  returnList;
    }

    @Override
    public RemoveReservationDTO removeReservation(Long id) {
        Reservation tobeDeleted = reservationRepository.findById(id).get();
        //this.future.cancel(true);
        Customer c = customerService.findOneByEmail(tobeDeleted.getCustomer().getEmail());
        Table t = tableService.getOne(tobeDeleted.getTable().getId());
        Facility f = facilityService.getOne(tobeDeleted.getFacility().getId());

        c.getReservations().remove(tobeDeleted);
        t.getReservationList().remove(tobeDeleted);
        f.getReservations().remove(tobeDeleted);
        reservationRepository.deleteById(id);

        return new RemoveReservationDTO(new FacilityDTO(facilityService.getOne(f.getId())),facilityService.findAll(),new CustomerDTO(c));
    }
}
