package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.model.Authority;
import diplomskiProjekat.ReserveTableApp.repository.AuthorityRepository;
import diplomskiProjekat.ReserveTableApp.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    AuthorityRepository authorityRepository;

    @Override
    public Authority findByname(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        return auth;
    }
}