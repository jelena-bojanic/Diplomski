package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private Environment env;

    @Override
    @Async
    public void notifyCustomer(Customer customer, Reservation reservation) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(customer.getEmail());
        mail.setFrom("reserve.table.app@gmail.com");
        mail.setSubject("Clinical System: Registration");
        mail.setText("Hello " + customer.getName() + ",\n\nYour reservation in"+ reservation.getFacility().getName()+"for table"+ reservation.getTable().getTableNum()+" is starting in 15 minutes."+ "\n\n\nReserveEasy Team");
        javaMailSender.send(mail);
    }
}
