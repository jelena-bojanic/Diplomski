package diplomskiProjekat.ReserveTableApp.config;

import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Notification;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class NotificationTask implements  Runnable {

    private Customer customer;

    private Reservation reservation;

    private SimpMessagingTemplate simpMessagingTemplate;

    public NotificationTask(){}

    public NotificationTask(Customer customer, Reservation reservation,SimpMessagingTemplate simpMessagingTemplate) {
        this.customer = customer;
        this.reservation = reservation;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void run() {
        Long time;
        if(LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES) > 60){
            time = LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.HOURS);
            simpMessagingTemplate.convertAndSendToUser(customer.getEmail(),"/socket-publisher/","Your reservation starts in "+ time +" hours");
        }else{
            time = LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES);
            simpMessagingTemplate.convertAndSendToUser(customer.getEmail(),"/socket-publisher/","Your reservation starts in "+ time +" minutes");
        }
    }

}
