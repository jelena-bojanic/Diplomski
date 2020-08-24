package diplomskiProjekat.ReserveTableApp.config;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class RunnableTask implements Runnable{

    private Customer customer;

    private Reservation reservation;

    private JavaMailSender javaMailSender;

    @Autowired
    private Environment env;

    @Autowired
    private EmailService emailService;

    public RunnableTask(){}

    public RunnableTask(Customer customer, Reservation reservation,JavaMailSender mailSender) {
        this.customer = customer;
        this.reservation = reservation;
        this.javaMailSender = mailSender;
    }


    @Override
    public void run() {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(customer.getEmail());
        mail.setFrom("reserve.table.app@gmail.com");
        mail.setSubject("ReserveEasy: Notification");
        if(LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES) < 60) {
            Long time = LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES);
            mail.setText("Hello " + customer.getName() + ",\n\nYour reservation in " + reservation.getFacility().getName() + " for table number " + reservation.getTable().getTableNum() + " is starting in " + time + " min." + "\n\n\nReserveEasy Team");
        }else if(LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.MINUTES) > 60){
            Long time = LocalTime.now().until(reservation.getStartReservation(), ChronoUnit.HOURS);
            mail.setText("Hello " + customer.getName() + ",\n\nYour reservation in " + reservation.getFacility().getName() + " for table number " + reservation.getTable().getTableNum() + " is starting in " + time + " h." + "\n\n\nReserveEasy Team");
        }
        javaMailSender.send(mail);


    }
}