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

        simpMessagingTemplate.convertAndSendToUser(customer.getEmail(),"/socket-publisher/",new Notification("Your reservation starts in "+ LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES)+" minutes"));

    }

}
